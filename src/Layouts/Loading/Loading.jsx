import React from 'react';
import { useLoading, Bars } from '@agney/react-loading';
export default function Loading() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" color="orangered"/>,
      });
    return (
            <section id="loading" {...containerProps}>
                {indicatorEl} 
            </section>
    )
}
 