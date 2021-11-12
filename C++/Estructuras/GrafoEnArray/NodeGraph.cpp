#include "NodeGraph.h"
NodeGraph::NodeGraph()
{
    this->Marked=false;
    this->Father=-1;
}
NodeGraph::~NodeGraph()
{
    
}
int NodeGraph::getFather()
{
    return Father;
}
void NodeGraph::setFather(int Father)
{
    this->Father=Father;
}
    
bool NodeGraph::getMarked()
{
    return Marked;
}
void NodeGraph::setMarked(bool Marked)
{
    this->Marked=Marked;
}
Lista8<int>& NodeGraph::getLista()
{
    return AdjacentList;
}
void NodeGraph::setNodeGraphToInitialState()
{
    this->Marked=false;
    this->Father=-1;
}

