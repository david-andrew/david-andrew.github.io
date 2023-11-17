export const YouTube = ({videoId, start, end, className=''}:{videoId:string, start?:number, end?:number, className?:string}) => {
    let startParam = start ? `start=${start}` : undefined;
    let endParam = end ? `end=${end}` : undefined;
    const timeParams = [startParam, endParam].filter(Boolean).join('&');
    const queryParams = timeParams ? `?${timeParams}` : '';

    return (
        <div className={`w-full relative pt-[56.25%] ${className}`}>
            <iframe
                className='w-full h-full top-0 left-0 absolute'
                src={`https://www.youtube.com/embed/${videoId}${queryParams}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
            />
        </div>
    );
}