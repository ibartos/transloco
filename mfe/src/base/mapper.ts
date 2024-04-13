export abstract class Mapper<I, O> {
    public abstract mapFrom(param: I): O;
    public abstract mapTo?(param: O): I;
}
