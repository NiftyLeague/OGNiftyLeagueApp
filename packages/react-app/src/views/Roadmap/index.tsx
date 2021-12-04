import React from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Image, Typography } from 'antd';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Container } from '@material-ui/core';

import Footer from 'components/Footer';
import NiftyLeagueStory from 'assets/gifs/story.gif';
import GamesSketch from 'assets/images/games/games-sketch.png';

import './roadmap.css';

const { Title } = Typography;

const Roadmap = ({ width }: { width: Breakpoint }): JSX.Element => {
  const { currentTheme } = useThemeSwitcher();
  return (
    <div className="roadmap-wrapper">
      <section id="cd-timeline" className="cd-container">
        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-picture" />

          <div className="cd-timeline-content">
            <h2>Penta Consulting</h2>
            <div className="timeline-content-info">
              <span className="timeline-content-info-title">
                <i className="fa fa-certificate" aria-hidden="true" />
                Front End Developer
              </span>
              <span className="timeline-content-info-date">
                <i className="fa fa-calendar-o" aria-hidden="true" />
                June 2016 - Present
              </span>
            </div>
            <p>
              Working alongside the designer team implementing the designs, also developing custom solutions to address
              team necessities.
            </p>
            <ul className="content-skills">
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript</li>
              <li>jQuery</li>
              <li>Wordpress</li>
            </ul>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-movie" />

          <div className="cd-timeline-content">
            <h2>Title of section 2</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic
              quasi placeat iure tempora laudantium ipsa ad debitis unde?
            </p>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-picture" />

          <div className="cd-timeline-content">
            <h2>Title of section 3</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, obcaecati, quisquam id molestias
              eaque asperiores voluptatibus cupiditate error assumenda delectus odit similique earum voluptatem
              doloremque dolorem ipsam quae rerum quis. Odit, itaque, deserunt corporis vero ipsum nisi eius odio natus
              ullam provident pariatur temporibus quia eos repellat consequuntur perferendis enim amet quae quasi
              repudiandae sed quod veniam dolore possimus rem voluptatum eveniet eligendi quis fugiat aliquam sunt
              similique aut adipisci.
            </p>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-location" />

          <div className="cd-timeline-content">
            <h2>Title of section 4</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic
              quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.
            </p>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-location" />

          <div className="cd-timeline-content">
            <h2>Title of section 5</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum.</p>
          </div>
        </div>

        <div className="cd-timeline-block">
          <div className="cd-timeline-img cd-movie" />

          <div className="cd-timeline-content">
            <h2>Final Section</h2>
            <p>This is the content of the last section</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withWidth()(Roadmap);
