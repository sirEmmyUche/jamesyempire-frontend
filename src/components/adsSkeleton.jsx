import Skeleton from "react-loading-skeleton";

const AdsSkeleton = () => {
    return (
        <div className="ads-skeleton">
            <div className="box">
                <Skeleton  width={'30%'}/>
                <Skeleton  width={'50%'}/>
                <Skeleton  width={'100%'}/>
                <Skeleton height={150} width={'100%'}/>
            </div>
             <div className="box">
                <Skeleton  width={'30%'}/>
                <Skeleton  width={'50%'}/>
                <Skeleton  width={'100%'}/>
                <Skeleton height={150} width={'100%'}/>
            </div>
             <div className="box">
                <Skeleton  width={'30%'}/>
                <Skeleton  width={'50%'}/>
                <Skeleton  width={'100%'}/>
                <Skeleton height={150} width={'100%'}/>
            </div>
        </div>
    );
};

export default AdsSkeleton;
