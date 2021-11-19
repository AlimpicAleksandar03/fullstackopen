import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("event handler has the correct details about input blog", () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm addBlog={createBlog} />);

    const urlInput = component.container.querySelector("#url");
    const titleInput = component.container.querySelector("#title");
    const authorInput = component.container.querySelector("#author");

    const form = component.container.querySelector("form");cdx 

    fireEvent.change(urlInput, {
        target: { value: "some url" },
    });
    fireEvent.change(titleInput, {
        target: { value: "some title" },
    });
    fireEvent.change(authorInput, {
        target: { value: "some author" },
    });
    fireEvent.submit(form);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].url).toBe("some url");
    expect(createBlog.mock.calls[0][0].title).toBe("some title");
    expect(createBlog.mock.calls[0][0].author).toBe("some author");
});
