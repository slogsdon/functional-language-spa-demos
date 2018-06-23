open ReasonReact;

open Components;

open Pages;

type action =
  | FollowLink(Routes.page);

type state = {component: reactElement};

let component = reducerComponent("App");

let make = _children => {
  ...component,
  initialState: () => {component: <Loading />},
  reducer: (action, _state) =>
    switch action {
    | FollowLink(Home) => Update({component: <HomePage />})
    | FollowLink(About) => Update({component: <AboutPage />})
    | FollowLink(NotFound) => Update({component: <NotFoundPage />})
    | _ => NoUpdate
    },
  didMount: self => {
    let watcher = (url: Router.url) =>
      url.path |> Routes.pageOfPath |. FollowLink |> self.send;
    watcher(Router.dangerouslyGetInitialUrl());
    let watcherID = Router.watchUrl(watcher);
    self.onUnmount(() => Router.unwatchUrl(watcherID));
  },
  render: self =>
    <div>
      <nav>
        <Link to_=Home> (ReasonReact.string("Home")) </Link>
        <Link to_=About> (ReasonReact.string("About")) </Link>
      </nav>
      self.state.component
    </div>
};
