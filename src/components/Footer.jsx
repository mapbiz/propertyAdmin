export default function Footer() {
    return <footer className={' text-white mt-[50px] w-full bg-[#040E08]  items-center flex justify-end pr-5 h-[60px] shadow-xl '}>
        <div className={'flex gap-2.5 items-center'}>
            <p>Админ панель разработана веб-студией <a target={"_blank"} href="https://mapbiz-group.com/">MaPbiz Group</a></p>
            <a href="tel:+7 989 240-0897">+7 989 240-0897</a>
        </div>
    </footer>
}