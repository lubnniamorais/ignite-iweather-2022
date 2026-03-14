import { fireEvent, render, screen } from '@testing-library/react-native';

import { SelectList } from '.';

describe('Component: SelectList', () => {
  it('should be return city details selected', () => {
    const data = [
      { id: '1', name: 'Campinas', latitude: 123, longitude: 456 },
      { id: '2', name: 'Campo Grande', latitude: 789, longitude: 987 },
    ];

    // Mockando a função, simulando um click
    const onPress = jest.fn();

    render(<SelectList data={data} onChange={() => {}} onPress={onPress} />);

    const selectedCity = screen.getByText(/campo/i);
    fireEvent.press(selectedCity);

    expect(onPress).toHaveBeenCalledWith(data[1]);
  });
});
