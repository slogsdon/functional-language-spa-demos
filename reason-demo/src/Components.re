module Link = {
  let component = ReasonReact.statelessComponent("Link");
  let updateUrl = (page, event) =>
    if (! Routes.isExternal(page)) {
      ReactEventRe.Mouse.preventDefault(event);
      ReasonReact.Router.push(Routes.getUrl(page));
    };
  let make = (~to_, children) => {
    ...component,
    render: _self =>
      ReasonReact.createDomElement(
        "a",
        ~props={"onClick": updateUrl(to_), "href": Routes.getUrl(to_)},
        children
      )
  };
};

module Loading = {
  let component = ReasonReact.statelessComponent("Loading");
  let make = _children => {
    ...component,
    render: _self => <div> (ReasonReact.string("Loading...")) </div>
  };
};
