export interface Identifiable {
    getId(): string;
}

export interface DataMapper<T extends Identifiable> {
    insert(instance: T): Promise<void>;
    update(instance: T): Promise<void>;
    delete(id: string): Promise<void>;
    fetch(id: string): Promise<T | null>;
    fetchAll(): Promise<T[] | null>;
    fetchByEmail(email: string): Promise<T | null>;

}
