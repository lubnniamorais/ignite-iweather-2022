import clearDay from '@assets/clear_day.svg';
import { NextDays } from '@components/NextDays';
import { render, screen } from '@testing-library/react-native';

describe('Component: NextDays', () => {
  it('should be render day', () => {
    render(
      <NextDays
        data={[
          {
            day: '23/03',
            min: '21°C',
            max: '30°C',
            icon: clearDay,
            weather: 'Nublado',
          },
          {
            day: '24/03',
            min: '19°C',
            max: '31°C',
            icon: clearDay,
            weather: 'Ensolarado',
          },
          {
            day: '25/03',
            min: '20°C',
            max: '30°C',
            icon: clearDay,
            weather: 'Ensolarado',
          },
        ]}
      />
    );

    expect(screen.getByText('23/03')).toBeTruthy();
  });
});
