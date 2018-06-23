module Types exposing (..)

import Navigation exposing (Location)
import Routes exposing (Page)


type alias Model =
    { page : Page
    }


type Msg
    = InitialLoad Location
    | FollowLink Page
