export default function HomePageImage({ImgPath}) {
    return (
        <div>
            <img src={ImgPath} alt={"Home Image"} className={"mt-30 lg:mt-35"}/>
        </div>
    )
}