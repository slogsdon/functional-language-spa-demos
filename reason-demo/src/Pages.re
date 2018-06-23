module AboutPage = {
  let component = ReasonReact.statelessComponent("AboutPage");
  let make = _children => {
    ...component,
    render: _self => <div> (ReasonReact.string("About")) </div>
  };
};

module HomePage = {
  let component = ReasonReact.statelessComponent("HomePage");
  let handleClick = (_event, _self) => Js.log("clicked!");
  let make = _children => {
    ...component,
    render: self =>
      <div onClick=(self.handle(handleClick))>
        (ReasonReact.string("Home"))
      </div>
  };
};

module NotFoundPage = {
  let component = ReasonReact.statelessComponent("NotFoundPage");
  let make = _children => {
    ...component,
    render: _self => <div> (ReasonReact.string("404: Not Found")) </div>
  };
};
