import axios from "axios";
import { GraphQLClient, gql } from "graphql-request";

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

/* ===========================
   Contribution Data (GraphQL)
=========================== */

const graphQLClient = new GraphQLClient(
  "https://api.github.com/graphql",
  {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  }
);
export const fetchContributionData = async (username) => {

  const query = gql`
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions

            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphQLClient.request(query, {
    username,
  });

  return data.user.contributionsCollection.contributionCalendar;
};

export const getRepositoryReadme = async (owner, repo) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const content = Buffer.from(
      response.data.content,
      "base64"
    ).toString("utf-8");

    return content;
  } catch (error) {
    console.error("README Fetch Error:", error.response?.data || error.message);
    throw new Error("Unable to fetch README");
  }
};