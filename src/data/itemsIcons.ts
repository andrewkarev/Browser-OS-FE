import CSS from '../assets/icons/css.png';
import SASS from '../assets/icons/sass.png';
import HTML from '../assets/icons/html.png';
import JS from '../assets/icons/javascript.png';
import TS from '../assets/icons/typescript.png';
import JSON from '../assets/icons/json.png';
import IMAGE from '../assets/icons/image.png';
import TXT from '../assets/icons/txt.png';
import VIDEO from '../assets/icons/video.png';
import AUDIO from '../assets/icons/audio.png';
import DEFAULT from '../assets/icons/default.png';
import FileType from 'common/fileType';

export const defaultIcon = {
  src: DEFAULT,
};

export const itemIcons = [
  {
    extensions: ['.js', '.jsx'],
    src: JS,
    type: FileType.text,
  },
  {
    extensions: ['.ts', '.tsx'],
    src: TS,
    type: FileType.text,
  },
  {
    extensions: ['.json'],
    src: JSON,
    type: FileType.text,
  },
  {
    extensions: ['.css'],
    src: CSS,
    type: FileType.text,
  },
  {
    extensions: ['.scss', '.sass'],
    src: SASS,
    type: FileType.text,
  },
  {
    extensions: ['.html'],
    src: HTML,
    type: FileType.text,
  },
  {
    extensions: ['.txt', '.doc', '.docx', '.odt', '.pdf', '.rtf', '.wpd', '.md'],
    src: TXT,
    type: FileType.text,
  },
  {
    extensions: ['.aif', '.cda', '.mid', '.midi', '.mp3', '.mpa', '.ogg', '.wav', '.wma', '.wpi'],
    src: AUDIO,
    type: FileType.audio,
  },
  {
    extensions: ['.png', '.svg', '.ico', '.jpeg', '.jpg', '.gif', '.bmp', '.psd', '.tiff', '.webp'],
    src: IMAGE,
    type: FileType.image,
  },
  {
    extensions: [
      '.3gp',
      '.avi',
      '.fiv',
      '.h264',
      '.m4v',
      '.mkv',
      '.mov',
      '.mp4',
      '.mpg',
      '.mpeg',
      '.wmv',
    ],
    src: VIDEO,
    type: FileType.video,
  },
];
