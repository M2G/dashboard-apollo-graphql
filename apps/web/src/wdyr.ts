//@see https://github.com/welldone-software/why-did-you-render/issues/243
/// <reference types="@welldone-software/why-did-you-render" />
import * as React from 'react';
// @see only with react-redux
// import * as ReactRedux from 'react-redux';
import whyDidYouRender from '@welldone-software/why-did-you-render';

if (import.meta.env.DEV) {
  whyDidYouRender(React, {
    include: [/.*/],
    exclude: [/^BrowserRouter/, /^Link/, /^Route/],
    trackHooks: true,
    trackAllPureComponents: true,
    //@see only with react-redux
    /*
    trackExtraHooks: [
      [
        // ReactRedux,
        'useSelector',
      ],
    ],
    */
  });
}
