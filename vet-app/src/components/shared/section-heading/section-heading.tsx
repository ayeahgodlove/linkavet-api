import React from 'react';
import "./section-heading.less";

interface IProps {
  heading: string;
  subHeading: string;
  className: string;
}
export const SectionHeading = (props: IProps) => {
  const defaultSubHeading = "Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore."
  const { heading, subHeading = defaultSubHeading, className = "" } = props;

  return (
    <div className={`section-heading ${className}`}>
      <h1 className="section-heading__main">{heading}</h1>
      <p className="section-heading__sub">
        {subHeading}
      </p>
    </div>
  )
}
