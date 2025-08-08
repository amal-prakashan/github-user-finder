//github user finder

const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const profile = document.getElementById("profile");
const repos = document.getElementById("repos")

searchBtn.addEventListener("click", async ()=> {

  const username = document.getElementById("username").value.trim();

  if(!username){
    window.alert("Please enter username");
    return; 
  }

  loading.style.display = "block";

  try{
    const userResource = await fetch(`https://api.github.com/users/${username}`);
    const repoResource = await fetch(`https://api.github.com/users/${username}/repos`);


    if(!userResource.ok){
      throw new Error("User not found");
    }

    const userData = await userResource.json();
    const repoData = await repoResource.json();
    
    profile.innerHTML = '';

    //user data-------------
    const image = document.createElement("div");
    image.className = "image";

    const profilePicture = document.createElement("img");
    profilePicture.src = userData.avatar_url;
    profilePicture.alt = userData.login;

    const profileDetails = document.createElement("div");
    profileDetails.className = "profileDetails";

    const userName = document.createElement("h2");
    userName.textContent = userData.name || userData.login;

    const bio = document.createElement('p');
    bio.className = "bio";
    bio.textContent = userData.bio || "No bio available";

    const connections = document.createElement('div');
    connections.className = "connections";

    const followers = document.createElement('p');
    const following = document.createElement('p');
    followers.textContent = `Followers: ${userData.followers}`;
    following.textContent = `Following: ${userData.following}`;

    const profileLink = document.createElement('a');
    profileLink.href = userData.html_url;
    profileLink.target = "_blank";
    profileLink.rel = "noopener noreferrer"
    profileLink.textContent = "Want to redirect the profile?"


    //appending
    image.appendChild(profilePicture);

    connections.appendChild(followers);
    connections.appendChild(following);

    profileDetails.appendChild(userName);
    profileDetails.appendChild(bio);
    profileDetails.appendChild(connections);
    profileDetails.appendChild(profileLink);

    profile.appendChild(image);
    profile.appendChild(profileDetails);

    repos.innerHTML = '';

    if (repoData.length === 0) {
      repos.innerHTML = "<p>This user has no public repositories</p>";
      profile.style.display = "flex";
      repos.style.display = "flex";
      return;
    }
  
    repos.innerHTML = "<h2>Repositories</h2>";

    //user repository----------
    repoData.forEach(repo => {


      const repoDiv = document.createElement('div');
      repoDiv.className = "repo";

      const repoName = document.createElement('h3');
      repoName.textContent = repo.name;

      const repoDesc = document.createElement('p');
      repoDesc.className = "repoDesc";
      repoDesc.textContent = repo.description || "No description available";

      const repoLang = document.createElement('p');
      repoLang.className = "repoLang";
      repoLang.textContent = `Language: ${repo.language || "N/A"}`;

      const repoStat = document.createElement('div');
      repoStat.className = "repoStat";

      const repoInfo = document.createElement('div');
      
      const stars = document.createElement('span');
      stars.textContent = `⭐ Stars: ${repo.stargazers_count}`;

      const forks = document.createElement('span');
      forks.textContent = `🍴 Forks: ${repo.forks_count}`;

      const repoLink = document.createElement("a");
      repoLink.href = repo.html_url;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.textContent = "Go to this Repository";

      //appending
      repoInfo.append(stars, forks);

      repoStat.append(repoInfo,repoLink);
      
      repoDiv.append(repoName, repoDesc, repoLang, repoStat);

      repos.appendChild(repoDiv);
    })

    profile.style.display = "flex";
    repos.style.display = "flex";

  }
  catch(error){
    console.error(error);
    profile.innerHTML = "";
    repos.innerHTML = `<p style="color:red;">${error.message}</p>`;
    profile.style.display = "none";
    repos.style.display = "block";
  }
  finally{
    loading.style.display = "none";
  }
  
})