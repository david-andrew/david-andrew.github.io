// "use client";
// import ReactYouTube from "react-youtube";

// export const YouTube = ({videoId, opts, className=''}:{videoId:string, opts:object, className?:string}) => {
//     return (
//         <div className={`flex justify-center ${className}`}>
//             <ReactYouTube
//                 className='w-full'
//                 videoId={videoId}
//                 opts={opts}
//             />
//         </div>
//     );
// }

export const YouTube = ({videoId, opts, className=''}:{videoId:string, opts:object, className?:string}) => {
    return (
        <div className={`flex justify-center h-[700px] ${className}`}>
            <iframe
                className='w-full'
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                {...opts}
            />
        </div>
    );
}