import app from '../app';

app.filter('duration', function() {
  return (input = 0) => {
    if (isNaN(input)) input = 0;

    let minutes = input / (60 * 1000);
    let seconds = minutes - Math.floor(minutes);

    minutes = Math.floor(minutes);
    seconds = Math.ceil(60 / 100 * (seconds * 100));

    if (seconds < 10) seconds = '0'+seconds;

    return `${minutes}:${seconds}`;
  };
});
