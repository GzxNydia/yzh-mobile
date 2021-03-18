import React from 'react';

export interface FooProps {
  title: string;
}

export default ({ title }: { title: string }) => <h1>{title}</h1>;
