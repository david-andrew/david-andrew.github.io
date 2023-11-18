export const YouTube = ({videoId, portrait=false, start, end, className=''}:{videoId:string, portrait?:boolean, start?:number, end?:number, className?:string}) => {
    let startParam = start ? `start=${start}` : undefined;
    let endParam = end ? `end=${end}` : undefined;
    const timeParams = [startParam, endParam].filter(Boolean).join('&');
    const queryParams = timeParams ? `?${timeParams}` : '';

    const aspectRatio = portrait ? 'pt-[177.77%]' : 'pt-[56.25%]';

    return (
        <div className={`w-full relative ${aspectRatio} ${className}`}>
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