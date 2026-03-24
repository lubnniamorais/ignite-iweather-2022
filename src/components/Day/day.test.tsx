import clearDay from '@assets/clear_day.svg';

import { Day } from '@components/Day';
import { render, screen } from '@testing-library/react-native';

describe('Component: Day', () => {
  it('should be render day', () => {
    render(
      <Day
        data={{
          day: '23/03',
          min: '21°C',
          max: '30°C',
          icon: clearDay,
          weather: 'Nublado',
        }}
      />
    );

    expect(screen.getByText('23/03')).toBeTruthy();
  });
});
