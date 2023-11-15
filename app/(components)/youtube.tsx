"use client";
import ReactYouTube from "react-youtube";

export const YouTube = ({videoId, opts}:{videoId:string, opts:object}) => {
    return (
        <div className='flex justify-center'>
            <ReactYouTube
                className='w-full'
                videoId={videoId}
                opts={opts}
            />
        </div>
    );
}

// export const YouTube = ({videoId, opts}:{videoId:string, opts:object}) => {
//     return (
//         <div className='flex justify-center'>
//             <iframe
//                 className='w-full'
//                 src={`https://www.youtube.com/embed/${videoId}`}
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen={true}
//                 {...opts}
//             />
//         </div>
//     );
// }