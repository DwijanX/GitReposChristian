#pragma once
#include <iostream>
using namespace std;

template <class T>
class Node
{
private:
	Node<T>* Next;
	Node<T>* Prev;
	T Data;
public:
	Node(Node<T>* Next, Node<T>* Prev,T Data);
	~Node();
	void SetNext(Node<T>* Next);
	Node<T>* GetNext();
	void SetPrev(Node<T>* Prev);
	Node<T>* GetPrev();
	T* GetData();
};
template <class T>
Node<T>::Node(Node<T>* Next, Node<T>* Prev,T Data)
{
	this->Next = Next;
	this->Prev = Prev;
	this->Data = Data;
}
template <class T>
Node<T>::~Node()
{
}
template <class T>
void Node<T>::SetNext(Node<T>* Next)
{
	this->Next = Next;
}
template <class T>
Node<T>* Node<T>::GetNext()
{
	return this->Next;
}
template <class T>
void Node<T>::SetPrev(Node<T>* Prev)
{
	this->Prev = Prev;
}
template <class T>
Node<T>* Node<T>::GetPrev()
{
	return this->Prev;
}
template <class T>
T* Node<T>::GetData()
{
	return &Data;
}