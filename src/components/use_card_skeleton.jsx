import CardSkeleton from "./card_skeleton"

const UseCardSkeleton = ()=>{
    return(
        <div className="use-card-skeleton">
            <div className="-use-card-skeleton-child">
                <CardSkeleton/>
            </div>
            <div className="-use-card-skeleton-child">
                <CardSkeleton/>
            </div>
            <div className="-use-card-skeleton-child">
                <CardSkeleton/>
            </div>
        </div>
    )
}

export default UseCardSkeleton