/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../utils/theme';
import React, { useState } from 'react';
import { Div_ContainerPage } from '../components/Components';
import { Input_Styled } from '../BlogApp/BlogAppNewArticle';
import { filterUrl } from '../utils/backendUrls';

type Data = { id: string; name: string }[];

export const HttpFilter = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([] as Data);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setValue(e.target.value);
    setErrorMessage(false);
    try {
      const response = await fetch(filterUrl(e.target.value));
      if (!response.ok) throw Error;
      setData(await response.json());
    } catch (error) {
      setErrorMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Div_ContainerPage>
      <h1
        css={css`
          color: ${colors.highlight};
          margin-bottom: 20px;
        `}
      >
        Http Filter
      </h1>
      <Input_Styled
        type='text'
        value={value}
        onChange={handleChange}
        placeholder='Search...'
      />
      {errorMessage && <div>server error</div>}
      {loading && <div>Loading...</div>}
      {
        <div>
          {data.map((i) => (
            <div key={i.id}>{i.name}</div>
          ))}
        </div>
      }
    </Div_ContainerPage>
  );
};
