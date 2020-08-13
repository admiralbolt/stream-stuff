#!/usr/bin/fish

set session "Stream"
set session_exists (tmux list-sessions | grep $session)

if test -z "$session_exists"
  cd $wh/git/stream-stuff/
  tmux new-session -d -s $session

  # Setup the django server.
  tmux rename-window -t 0 "Django"
  tmux send-keys -t "Django" "cd stream_backend" C-m
  tmux send-keys -t "Django" "python.exe manage.py runserver 0.0.0.0:8000" C-m

  # Setup the frontend stuff.
  tmux new-window -t $session:1 -n "Frontend"
  tmux select-window -t $session:1
  tmux send-keys -t "Frontend" "cd overlay" C-m
  tmux send-keys -t "Frontend" "node socket-server/server.js" C-m

  # New pane
  tmux splitw -h -p 50
  tmux selectp -t 2
  tmux send-keys -t "Frontend" "cd overlay" C-m
  tmux send-keys -t "Frontend" "ember s" C-m

end

tmux attach-session -t $session:0
