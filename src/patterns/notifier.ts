/**
 * Notifier from Notifier/Observer pattern
 */
class Notifier
{
    //Array of observers to notify
    private _observers: Observer[];

    /**
     * Constructor
     */
    constructor()
    {
        this._observers = [];
    }

    /**
     * Adds an observer to the collection
     * @param observer
     */
    addObserver(observer: Observer)
    {
        this._observers.push(observer);
    }

    /**
     * Notifies all the observers of the current notifier
     */
    notify()
    {
        this._observers.forEach((observer) => { observer.notify(); });
    }
    
}