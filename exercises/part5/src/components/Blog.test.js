import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders title", () => {
    const blog = {
        author: "John",
        title: "title",
        url: "http",
    };
    const component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent("title");
    expect(component.container).toHaveTextContent("John");
});
test("show button clicked", () => {
    const blog = {
        author: "John",
        title: "title",
        url: "http",
        user: {
            username: "Marko",
        },
    };
    const component = render(<Blog blog={blog} user={{ username: "Marko" }} />);
    const button = component.getByText("show");
    fireEvent.click(button);
    expect(component.container).toHaveTextContent("http");
    expect(component.container).toHaveTextContent("likes");
});
test("liked button clicked twice", () => {
    const blog = {
        author: "John",
        title: "title",
        url: "http",
        user: {
            username: "Marko",
        },
    };
    const mockHandler = jest.fn();
    const component = render(
        <Blog blog={blog} user={{ username: "Marko" }} addLike={mockHandler} />
    );
    const showButton = component.getByText("show");
    fireEvent.click(showButton);
    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
});
