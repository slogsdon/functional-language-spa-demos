module Main exposing (..)

-- Third-party packages

import Html exposing (..)
import Navigation


-- Project modules

import Components exposing (..)
import Pages exposing (..)
import Routes exposing (..)
import Types exposing (..)


main : Program Never Model Msg
main =
    Navigation.program InitialLoad
        { init = init
        , view = view
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }



-- MODEL


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    let
        page =
            pageOfLocation location
    in
        ( Model page
        , Cmd.none
        )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        InitialLoad location ->
            let
                page =
                    pageOfLocation location
            in
                ( model, Cmd.map (\_ -> FollowLink page) Cmd.none )

        FollowLink page ->
            ( { model | page = page }
            , (Navigation.newUrl (urlOfPage page))
            )



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ nav []
            [ link Home "Home"
            , link About "About"
            ]
        , hr [] []
        , htmlOfPage model.page
        ]


htmlOfPage : Page -> Html msg
htmlOfPage page =
    case page of
        Home ->
            homePage

        About ->
            aboutPage

        _ ->
            notFoundPage
