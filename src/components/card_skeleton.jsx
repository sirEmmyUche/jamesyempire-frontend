import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CardSkeleton = ({count})=>{
    return(<div className='card-skeleton-main-holder'>
            <Skeleton height={100}/>
            <Skeleton count={2}/>
            <div className='card-skeleton'>
                <div className='--child'>
                    <Skeleton/>
                </div>
                <div className='--child'>
                    <Skeleton/>
                </div>
            </div>
            <Skeleton height={25}/>
    </div>)
}

export default CardSkeleton