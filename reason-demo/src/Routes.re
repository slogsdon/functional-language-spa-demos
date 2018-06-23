type page =
  | Home
  | About
  | NotFound
  | External(string);

let getUrl = page =>
  switch page {
  | Home => "/"
  | About => "/about"
  | NotFound => "/404"
  | External(url) => url
  };

let pageOfPath = path =>
  switch path {
  | [] => Home
  | ["about"] => About
  | _ => NotFound
  };

let isExternal = page =>
  switch page {
  | External(_) => true
  | _ => false
  };
