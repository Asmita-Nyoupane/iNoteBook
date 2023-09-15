import React from "react";

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div class="card  my-3">
        <div class="card-body">
          <h5 class="card-title">{note.title}</h5>
          <p class="card-text">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis fuga dolorum doloribus cupiditate perferendis, nobis nam cum aperiam sint sequi iusto fugiat autem ea pariatur iste dolorem nemo libero neque ipsa asperiores amet optio.</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
