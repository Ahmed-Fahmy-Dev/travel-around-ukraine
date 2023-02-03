import { render } from '@testing-library/react';
import ImageGallery from './ImageGallery';

jest.mock('../../../../components/SliderButton/SliderButton', () => () => <button>test button</button>);

describe('Swiper has to render', () => {
  test('swiper renders', () => {
    const images = ['test1', 'test2', 'test3'];

    const { asFragment } = render(<ImageGallery imageUrls={images} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
