import AdsSkeleton from "../components/adsSkeleton";
import AdsCard from "../components/adsCard";
import RenderResourceData from "../components/render_resources_data";
import {getAllPropertyAdsResponse} from "../APIs"
import { user } from '../store/user';

const AdsResponsePage = () => {
    const token = user((state) => state.user.token);
    const account_id = user((state) => state.user.account_id);

    return (
        <div>
            {/* <AdsSkeleton /> */}
           <RenderResourceData
            resourceAPIFn={getAllPropertyAdsResponse}
            uniqueKey="ads"
            dataKey="ads"
            SkeletonComponent={AdsSkeleton}
            RenderItem={(props) => <AdsCard  {...props} />}
            getKey={(item) => item.ads_response_id}
            mode="infinite"
            params={{
                        token,
                        id: account_id
                    }}
            />
        </div>
    );
};

export default AdsResponsePage;

            
