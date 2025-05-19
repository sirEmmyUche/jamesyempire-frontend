import Comments from "../components/comments";
import BrowseProperties from "../components/browse_properties";
import PropCount from "../components/prop_count";
import Static_1 from "../components/static_1";
import HomePagePropertyListingSample from "../components/sample_fetch_prop";
import Static_2 from "../components/static_2";
import SubmitEmail from "../components/submit_email";

function Home() {
    return (
      <main id="home-main">
        <section className="home-first-section">
          <div className="--holder">
              <div className="home-pg-desc">
                  <h1>Buy, book or rent your property easily</h1>
                  <p>A great platform foy buying, booking and renting properties</p>
              </div>
              <div className="--home-com-wrap">
                  <Comments/>
              </div>
          </div>
          <div className="--absolute"></div>
          <div className="mini-filter-search-holder">
              <BrowseProperties/>
          </div>
          <div className="home-count-holder">
            <PropCount targetNumber={200}/>
          </div>
        </section>
        <section className="home-second-section">
          <Static_1/>
        </section>
        <section className="home-third-section">
          <HomePagePropertyListingSample/>
        </section>
        <section className="home-fourth-section">
          <Static_2/>
        </section>
        <section className="home-fifth-section">
          <SubmitEmail/>
        </section>
      </main>
    );
  }
  
  export default Home;