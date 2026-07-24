import { useState, useEffect } from "react";

import SearchBar from "../components/SearchBar";
import RecentSearches from "../components/RecentSearches";
import FavoriteProfiles from "../components/FavoriteProfiles";
import ProfileCard from "../components/ProfileCard";
import RepositoryList from "../components/RepositoryList";
import AnalyticsCards from "../components/AnalyticsCards";
import FollowersList from "../components/FollowersList";
import FollowingList from "../components/FollowingList";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import LanguageChart from "../components/LanguageChart";
import StarsChart from "../components/StarsChart";
import ThemeToggle from "../components/ThemeToggle";

import { useTheme } from "../context/ThemeContext";

import {
  getProfile,
  getRepositories,
  getFollowers,
  getFollowing,
} from "../services/githubService";


function Home() {

  const [profile,setProfile] = useState(null);
  const [repositories,setRepositories] = useState([]);
  const [analytics,setAnalytics] = useState({});
  const [followers,setFollowers] = useState([]);
  const [following,setFollowing] = useState([]);

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const [recentSearches,setRecentSearches] = useState([]);
  const [favorites,setFavorites] = useState([]);

  const {darkMode}=useTheme();



  useEffect(()=>{

    const searches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];

    const favs =
    JSON.parse(localStorage.getItem("favoriteProfiles")) || [];


    setRecentSearches(searches);
    setFavorites(favs);


  },[]);





  const handleAddFavorite=(profile)=>{

    const exists=favorites.some(
      item=>item.login===profile.login
    );


    if(exists) return;


    const updated=[
      ...favorites,
      profile
    ];


    setFavorites(updated);


    localStorage.setItem(
      "favoriteProfiles",
      JSON.stringify(updated)
    );

  };






  const handleSearch=async(username)=>{

    try{

      setLoading(true);
      setError("");



      const updatedSearches=[
        username,
        ...recentSearches.filter(
          item=>item!==username
        )
      ].slice(0,5);



      setRecentSearches(updatedSearches);


      localStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );



      const profileData=
      await getProfile(username);


      setProfile(profileData);




      const repoData=
      await getRepositories(username);


      setRepositories(repoData.repositories);

      setAnalytics(repoData.analytics);





      const followersData=
      await getFollowers(username);


      setFollowers(followersData);




      const followingData=
      await getFollowing(username);


      setFollowing(followingData);



    }

    catch(err){

      console.log(err);


      setError(
        "GitHub user not found"
      );


      setProfile(null);
      setRepositories([]);
      setAnalytics({});
      setFollowers([]);
      setFollowing([]);

    }


    finally{

      setLoading(false);

    }

  };





return(

<div
className={`min-h-screen transition-all duration-300 ${
darkMode
?
"bg-slate-950 text-white"
:
"bg-gray-100 text-gray-900"
}`}
>


{/* Navbar */}

<nav
className={`flex justify-between items-center
px-8 py-5 shadow-md
${
darkMode
?
"bg-slate-900"
:
"bg-white"
}`}
>


<h1 className="text-3xl font-bold text-cyan-400">
🚀 DevLens
</h1>


<ThemeToggle/>


</nav>





<div className="max-w-7xl mx-auto px-6 py-8">



<p className="text-center text-gray-400 text-lg mb-8">
GitHub Contribution Analyzer
</p>





{/* Search */}

<div className="mb-8">

<SearchBar
onSearch={handleSearch}
/>

</div>






{/* Recent Searches */}

<RecentSearches

searches={recentSearches}

onSearch={handleSearch}

/>






{/* Favorites */}

<FavoriteProfiles

favorites={favorites}

onSelect={handleSearch}

/>






{
loading &&
<div className="mt-8">
<Loading/>
</div>
}





{
error &&
<div className="mt-8">
<ErrorMessage message={error}/>
</div>
}






{
profile &&

<div className="mt-10
bg-white dark:bg-slate-900
rounded-xl shadow-lg p-6">


<ProfileCard

profile={profile}

onAddFavorite={handleAddFavorite}

/>


</div>

}








{
Object.keys(analytics).length>0 &&


<div className="mt-10">

<h2 className="text-3xl font-bold mb-5">
📊 Developer Analytics
</h2>


<AnalyticsCards
analytics={analytics}
/>


</div>

}







{
analytics.languageStats &&


<div
className="grid grid-cols-1
lg:grid-cols-2 gap-8 mt-10"
>


<div className="
bg-white dark:bg-slate-900
rounded-xl shadow-lg p-6">

<h2 className="text-xl font-bold mb-4">
💻 Languages
</h2>


<LanguageChart

languageStats={
analytics.languageStats
}

/>

</div>





<div className="
bg-white dark:bg-slate-900
rounded-xl shadow-lg p-6">


<h2 className="text-xl font-bold mb-4">
⭐ Stars
</h2>


<StarsChart

repositories={repositories}

/>


</div>



</div>

}







{
repositories.length>0 &&


<div className="mt-10">

<h2 className="text-3xl font-bold mb-5">
📁 Repositories
</h2>


<RepositoryList

repositories={repositories}

/>


</div>

}








{
followers.length>0 &&


<div className="mt-10">

<h2 className="text-3xl font-bold mb-5">
👥 Followers
</h2>


<FollowersList

followers={followers}

/>


</div>

}








{
following.length>0 &&


<div className="mt-10 mb-20">


<h2 className="text-3xl font-bold mb-5">
➡️ Following
</h2>


<FollowingList

following={following}

/>


</div>

}





</div>


</div>


);


}


export default Home;