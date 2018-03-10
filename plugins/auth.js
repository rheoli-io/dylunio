export default function({ $auth }) {
  if ($auth) {
    $auth.onError((error, name, endpoint) => {
      console.error(name, error);
    });
  }
}
