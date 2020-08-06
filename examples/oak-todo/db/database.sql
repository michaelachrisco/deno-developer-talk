CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE todos (
    id uuid DEFAULT uuid_generate_v4 (),
    todo VARCHAR NOT NULL,
    isCompleted Boolean NOT NULL,
    PRIMARY KEY (id)
);