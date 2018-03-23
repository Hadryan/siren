import TrackPlayer from 'react-native-track-player'

export default async (data) => {
  switch (data.type) {
    case 'remote-play':
      TrackPlayer.play()
      break
    case 'remote-pause':
      TrackPlayer.pause()
      break
  }
};

export const addListener = () => {

}