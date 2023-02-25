const useUserMedia = async () => {
  const getUserMedia = navigator.mediaDevices.getUserMedia

  if (getUserMedia) {
    try {
      const stream = await getUserMedia({ video: true, audio: true })
      return stream
    } catch (error) {
      console.error('Error `getUserMedia` ', error)
    }
  } else {
    alert('Error. WebRTC is not supported!')
  }
}

export default useUserMedia
