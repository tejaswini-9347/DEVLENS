import axios from "axios";

export const fetchUserRepositories = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

export const fetchUserProfile = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};
export const fetchFollowers = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/followers`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};
export const fetchFollowing = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/following`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};