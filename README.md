# Содержание
- [Разворот](#разворот)
- [helpers](#helpers)
  - [Кастомные хуки](#кастомные-хуки)
    - [useCopyFile](#usecopyfile)
  

# Разворот
```bash
 npm i
 cp .env.[mode].example .env
 npm run dev # Для старта в режиме vite сервера
 npm run preview # Для старта в режиме vite prod сервера
```

# helpers
#### Содержание раздела
- [Содержание](#содержание)
- [helpers](#helpers)
   - [Маленькие функции](#маленькие-функции)
      - [array](#array)
      - [formData](#formdata)
      - [object](#object)
   - [Кастомные хуки](#кастомные-хуки)
      - [useCopyFile](#usecopyfile)

## Маленькие функции 
Небольшие функции которые облегчают стандатрные действия/шорткоды

### array
`swapElements` - Меняет элемент из `index1` в `index2`
### formData
`objectToFormData` - Переводит обьект в форм дату
### object
`objectIsEmpty` - Проверяет обьект на пустоту

## Кастомные хуки

### useCopyFile
Функция для получение оригинальных файлов, и копированных (не совсем хук 😉)

###### Проблематика
```jsx
   function SomeFileInput() {
      const [fileNames, setFilesNames] = useState(""),
      [files, setFiles] = useState("");

      return (
         <>
            <input 
               type="file"
               onChange={e => {
                  const files = e.target.files // Здесь получаются загруженные файлы
                  
                  setFiles(files) // Файлы отправляются в стейт для дальнейшей выдачи
                  setFilesNames(Array.from(files).map(file => file.name)) // Выдается список файлов
               }}
            />

            <p>{filesNames.length > 0 ? filesNames.join(", "): ''}</p>
         </>
      )
   }
```
Простой пример инпута с файлами, после сета файлов в `files`, значения `filesNames` будет **очищено!**
Как же избежать такого поведения, и получить готовые файлы на выходе?
Использовать кастомный хук `useCopyFile`

###### Пример использования
```jsx
   function SomeFileInput() {


      const [fileNames, setFilesNames] = useState(""),
      [files, setFiles] = useState("");

      return (
         <>
            <input 
               type="file"
               onChange={e => {
                  const copy = useCopyFiles(e.target.files) // Здесь получаются загруженные файлы
                  
                  setFiles(copy.files) // Отдаем оригинальные файлы
                  setFilesNames(Array.from(copy.copiedFiles).map(file => file.name)) // Используем скопированные в своих целях
               }}
            />

            <p>{filesNames.length > 0 ? filesNames.join(", "): ''}</p>
         </>
      )
   }
```
Не забывайте, **Не смейте использовать скопированные файлы дважды**
Это приведет к серьезным проблемам с производительностью, желательно удалить копированные файлы, после того как их использовали
Используйте, только для подобного мелкого взаимодействия, не нагружая интерфейс 😉

