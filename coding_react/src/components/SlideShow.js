import {useState} from 'react'
import Slide from './Slide'

export default function SlideShow({images}) {
    const [active,setActive] = useState(0)

    const onNext = () => {

        if(active < images.length - 1) {
            setActive(active + 1)
        }

    }

    const onPrev = () => {
        if(active > 0) {
            setActive (active - 1)
        }

    }
  return (
    <div className='slideshow'>
        {
            images.map((el,i) => (
                <Slide key = {el.caption} {...el} active={i === active}/>
            ))
        }
        <div className='bullet-navigation'>
            {images.map((e,i) => (
                <div className={`dot  ${i === active ? "active" : ""}`} key={e.caption} onClick = {() => setActive(i)}></div>
            ))}
        </div>
        <div className='arrow-navigation'>
            <div className='navigation next' onClick={onNext}>&gt;</div>
            <div className=' navigation prev' onClick={onPrev}>&lt;</div>
        </div>
    </div>
  )
}
