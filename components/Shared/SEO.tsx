import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const defaultDesc = "西安市慈善会官方网站 - 扶贫济困，安老抚孤";
  const siteTitle = "西安市慈善会";

  return (
    <Helmet>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta property="og:title" content={`${title} | ${siteTitle}`} />
      <meta property="og:description" content={description || defaultDesc} />
    </Helmet>
  );
};