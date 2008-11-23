val init : unit -> unit
val set_debug : (string -> unit) -> unit
val set_exn_handler : (exn -> unit) -> unit

type 'a result = Value of 'a | Fail of exn

module Behavior :
sig
  type 'a t = 'a Froc.Behavior.t

  val return : 'a -> 'a t
  val fail : exn -> 'a t
  val bind : 'a t -> ('a -> 'b t) -> 'b t
  val (>>=) : 'a t -> ('a -> 'b t) -> 'b t
  val bind_lift : 'a t -> ('a -> 'b) -> 'b t
  val (>>) : 'a t -> ('a -> 'b) -> 'b t
  val catch : (unit -> 'a t) -> (exn -> 'a t) -> 'a t
  val try_bind : (unit -> 'a t) -> ('a -> 'b t) -> (exn -> 'b t) -> 'b t

  val read : 'a t -> 'a
  val read_result : 'a t -> 'a result
  val add_notify : 'a t -> ('a result -> unit) -> unit
  val switch : 'a t t -> 'a t

  val mouse : (int * int) t

  val attach_innerHTML : #Dom.element -> string t -> unit

  val appendChild : #Dom.node -> #Dom.node t -> unit
  val replaceNode : #Dom.node -> #Dom.node t -> unit

  val delay : 'a t -> float -> 'a t
  val delayb : 'a t -> float t -> 'a t
end

module Event :
sig
  type 'a t = 'a Froc.Event.t

  val make : unit -> 'a t
  val send : 'a t -> 'a -> unit
  val send_exn : 'a t -> exn -> unit
  val send_result : 'a t -> 'a result -> unit

  val add_notify : 'a t -> ('a result -> unit) -> unit

  val merge : 'a t list -> 'a t
  val map : ('a -> 'b) -> 'a t -> 'b t
  val filter : ('a -> bool) -> 'a t -> 'a t
  val collect : ('b -> 'a -> 'b) -> 'b -> 'a t -> 'b t

  val mouse : (int * int) t

  val clicks : #Dom.button -> unit t

  val ticks : float -> unit t
  val ticksb : float Behavior.t -> unit t

  val delay : 'a t -> float -> 'a t
  val delayb : 'a t -> float Behavior.t -> 'a t
end

val hold : 'a -> 'a Event.t -> 'a Behavior.t
val hold_result : 'a result -> 'a Event.t -> 'a Behavior.t
val changes : 'a Behavior.t -> 'a Event.t
val when_true : bool Behavior.t -> unit Event.t
val count : 'a Event.t -> int Behavior.t