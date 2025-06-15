export default function Heading({heading, paragraph}) {
    return (
        <div className={'flex flex-col space-y-2'}>
            <h1 className="font-poppins text-2xl font-bold text-dark">{heading}</h1>
            <p className="font-poppins text-muted-foreground">{paragraph}</p>
        </div>
    )
}