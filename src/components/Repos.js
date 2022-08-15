/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import {
  ExampleChart,
  Pie3D,
  Column3D,
  Bar3D,
  Doughnut2D,
} from './Charts';

const Repos = () => {
  const { repos } = useContext(GithubContext);

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count: stars } = item;

    if (!language) return total;

    // does the object total have that poperty language
    // if no, create one
    if (!total[language]) {
      // if language is not on the object
      // create a new language item
      total[language] = { label: language, value: 1, stars };
    } else {
      // if language is already on the object
      total[language] = {
        ...total[language], // copy the valuess that the object currently has
        value: total[language].value + 1,
        stars: total[language].stars + stars,
      };
    }
    return total;
  }, {});

  console.log(languages);

  // turn languages object into an array
  // sort languages from highest to lowest
  // slice - only return five values
  const mostUsed = Object.values(languages)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  console.log('mostUsed', mostUsed);

  // most stars per language
  // sort the arrau based on the number of stars
  // replace the value property with stars value
  // slice
  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map((item) => {
      return { ...item, value: item.stars };
    }).slice(0,5);

  console.log('mostPopular', mostPopular);

  const chartData = [
    { label: 'HTML', value: '13' },
    { label: 'CSS', value: '23' },
    { label: 'JavaScript', value: '80' },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <div></div>
        <Doughnut2D data={mostPopular} />
        <div></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
