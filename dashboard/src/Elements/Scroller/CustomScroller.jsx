import {Scrollbar} from 'react-scrollbars-custom';


export default function CustomScroller({children}) {
    return (
        <Scrollbar
            noScrollX
            style={{height: '100%', maxHeight: '100%'}}
            trackYProps={{
                style: {width: 0}, // hide scrollbar track
            }}
            thumbYProps={{
                style: {background: 'transparent'}, // hide scrollbar thumb
            }}
            contentProps={{
                className: 'flex flex-col gap-4'
            }}
            className="flex-grow min-h-0"
        >
            {children}
        </Scrollbar>
    )
}