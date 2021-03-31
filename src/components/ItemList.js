import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import SneakerItem from "./SneakerItem";

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "#e5e5e5" : "white",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#c3ebb0" : "#cccccc",
});

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toShow: 10,
    };
  }

  handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (
      Math.ceil(scrollHeight - scrollTop) === clientHeight ||
      Math.floor(scrollHeight - scrollTop) === clientHeight
    ) {
      this.setState({ toShow: this.state.toShow + 5 });
    }
  };

  render() {
    const { items, byIds, id } = this.props;
    return (
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div className="list-wrap">
            {this.props.children}
            <div
              className="list"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              onScroll={this.handleScroll}
            >
              {items.slice(0, this.state.toShow).map((sneaker, index) => (
                <Draggable
                  key={sneaker}
                  draggableId={String(sneaker)}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="draggable-dnd"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <SneakerItem
                        sneaker={byIds[sneaker]}
                        id={sneaker}
                        key={sneaker}
                        columnId={id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    );
  }
}

export default ItemList;
